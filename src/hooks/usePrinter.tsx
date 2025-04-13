import {useEffect, useState} from 'react';
import {
  COMMANDS,
  INetPrinter,
  NetPrinter,
} from 'react-native-thermal-receipt-printer-image-qr';
import {useAuth} from '../context/AuthContext';

interface PrinterConfig {
  host: string;
  port: number;
  name?: string;
}

interface PrinterHook {
  listPrinters: PrinterConfig[];
  currentPrinter: INetPrinter | null;
  setListPrinters: (isprinters: PrinterConfig[]) => void;
  connectPrinter: (host: string, port: number) => Promise<INetPrinter>;
  printText: (text: string, printer?: PrinterConfig) => Promise<void>;
  printBill: (
    items: {name: string; quantity: number; price: number}[],
    total?: number,
    opt?: {
      printer?: PrinterConfig;
    },
  ) => Promise<void>;
}

export const usePrinter = (): PrinterHook => {
  const {mesa, user} = useAuth();
  const [listPrinters, setListPrinters] = useState<PrinterConfig[]>([
    {host: '192.168.3.220', port: 9100, name: 'Default Printer'},
  ]);
  const [currentPrinter, setCurrentPrinter] = useState<INetPrinter | null>(
    null,
  );
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializePrinter = async () => {
      try {
        await NetPrinter.init();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize printer library:', error);
      }
    };

    initializePrinter();
  }, []);

  const connectPrinter = async (
    host: string,
    port: number,
  ): Promise<INetPrinter> => {
    try {
      if (!isInitialized) {
        setIsInitialized(true);
        await NetPrinter.init();
      }

      const printer = await NetPrinter.connectPrinter(host, port || 9100);

      setCurrentPrinter(printer);
      return printer;
    } catch (error) {
      console.warn('Connection error:', error);
      throw error;
    }
  };

  const printText = async (text: string, printer?: PrinterConfig) => {
    try {
      if (!isInitialized) {
        await NetPrinter.init();
        setIsInitialized(true);
      }

      if (printer) {
        // Connect to the specified printer first
        await connectPrinter(printer.host, printer.port);
        NetPrinter.printBill(text);
      } else if (currentPrinter) {
        // Use the currently connected printer
        NetPrinter.printBill(text);
      } else {
        console.error('No printer connected');
      }
    } catch (error) {
      console.warn('Failed to print text:', error);
    }
  };

  const printBill = async (
    items: {name: string; quantity: number; price: number}[],
    total?: number,
    opt?: {
      printer?: PrinterConfig;
    },
  ) => {
    try {
      let receiptText = `<C><B>${user?.nome}</B></C>\n`;

      if (!isInitialized) {
        await NetPrinter.init();
        setIsInitialized(true);
      }

      // Connect to the specified printer if provided
      if (opt?.printer) {
        try {
          await connectPrinter(opt?.printer.host, opt?.printer.port);
        } catch (error) {
          console.warn('Failed to connect to printer:', error);
          return;
        }
      } else if (!currentPrinter) {
        console.warn('No printer connected');
        return;
      }

      // Constrói o texto para impressão na cozinha
      receiptText += `<C>${COMMANDS.HORIZONTAL_LINE.HR3_80MM}</C>\n\n`;
      receiptText += `<CB>MESA ${mesa.mesa}</CB>\n\n`;
      receiptText += `<C>${COMMANDS.HORIZONTAL_LINE.HR3_80MM}</C>\n\n`;

      // Adiciona os itens sem preços, destacando a quantidade
      items.forEach(item => {
        receiptText += `<B>${item.quantity}x ${item.name}</B> \n`;
        receiptText += `<C>${COMMANDS.HORIZONTAL_LINE.HR3_80MM}</C>\n\n`;
      });

      // Adiciona data e hora
      receiptText += `\n<C>${new Date().toLocaleString('pt-BR')}</C>\n`;

      // Imprime o recibo completo
      NetPrinter.printBill(receiptText);
    } catch (error) {
      console.warn('Failed to print bill:', error);
    }
  };

  useEffect(() => {
    return () => {
      // NetPrinter.closeConn();
    };
  }, []);

  return {
    listPrinters,
    currentPrinter,
    setListPrinters,
    connectPrinter,
    printText,
    printBill,
  };
};

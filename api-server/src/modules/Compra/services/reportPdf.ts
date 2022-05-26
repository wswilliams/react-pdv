import moment from "moment";
const fs = require('fs');
const PdfPrinter = require('pdfmake');

export class ReportPdf {
    public async execute(data: any, datas: any): Promise<string> {
        const content = data.map((log: any, index: number) => {
            const fillColor = index & 1 ? '#d5d4d4' : '';
            return [
                {
                    style: 'tableExample',
                    table: {
                        widths: [40, 710],
                        body: [
                            [
                                { text: 'Total', fillColor, style: 'tableHeader', alignment: 'center' },
                                { text: log.compra.total, fillColor }
                            ],
                            [
                                { text: 'data', fillColor, style: 'tableHeader', alignment: 'center' },
                                { text: log.compra.data_criacao, fillColor }
                            ],
                            [
                                { text:'forma' , fillColor, style: 'tableHeader', alignment: 'center' },
                                { text: log.compra.tipo_pagamento, fillColor }
                            ],
                            [
                                { text:'status' , fillColor, style: 'tableHeader', alignment: 'center' },
                                { text: log.compra.status, fillColor }
                            ],
                            [
                                { text:'produtos' , fillColor, style: 'tableHeader', alignment: 'center' },
                                { text: JSON.stringify(log.produtos[0]), fillColor }
                            ]

                        ]
                    }
                }
            ]
        })
        

        const header = [
            {
                image: './src/shared/assets/logotipo.png',
                width: 50
            },
            {
                text: `Relatório de vendas por dada ${datas.startDate} até ${datas.endDate}`,
                style: 'header',
            },
            {
                text: 'Lista de Vendas',
                style: 'subheader'
            },
        ];
        content.unshift(header);

        const styles = {
            tableExample: {
                fontSize: 9,
                alignment: 'left',
                width: 20,
                margin: [0, 0, 0, 10]
            },
            tableFilters: {
                fontSize: 9,
                alignment: 'left',
                width: 20,
                margin: [0, 0, 0, 20]
            },
            header: {
                alignment: 'center',
                fontSize: 14,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 10,

                bold: true,
                margin: [0, 0, 0, 3]
            },
            tableHeader: {
                bold: true,
                fontSize: 9,
                color: 'black'
            }
        };
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            content,
            styles
        };

        const pathFonts = './src/shared/assets/fonts/Roboto/';
        const fonts = {
            Roboto: {
                normal: `${pathFonts}Roboto-Regular.ttf`,
                bold: `${pathFonts}Roboto-Medium.ttf`,
                italics: `${pathFonts}Roboto-Italic.ttf`,
                bolditalics: `${pathFonts}Roboto-MediumItalic.ttf`
            }
        }

        const filename = `logs-${moment()}.pdf`;
        const path: any = `tmp/${filename}`;

        const printer = new PdfPrinter(fonts);
        const pdfDoc = printer.createPdfKitDocument(docDefinition, {});
        pdfDoc.pipe(fs.createWriteStream(path));
        pdfDoc.end();

        return path;
    }
}

import React from "react";
import ReactPDF, {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
    Font
} from "@react-pdf/renderer";
// import roboto300 from '@/roboto/roboto-v30-latin-300.woff2';
import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "@/components/Button";
Font.register({
    family: "Inter",
    fonts: [
        { src: "/roboto/roboto-v30-latin-300.ttf", fontWeight: 'light' },
        { src: "/roboto/roboto-v30-latin-300italic.ttf", fontStyle: 'italic' },
        { src: "/roboto/roboto-v30-latin-500.ttf", fontWeight: 'bold' },
        { src: "/roboto/roboto-v30-latin-500italic.ttf", fontStyle: 'italic', fontWeight: 'bold' },

    ]
})


const styles = StyleSheet.create({

    text: {
        textAlign: 'center',
        paddingVertical: '1px',
        margin: 0,
        fontSize: '9px',
        fontFamily: 'Inter',
        fontWeight: 'light',


    },
    textItalic: {
        textAlign: 'center',
        paddingVertical: '1px',
        margin: 0,
        fontSize: '9px',
        fontFamily: 'Inter',
        fontStyle: 'italic'
    },
    textBold: {
        paddingVertical: '1px',
        margin: 0,
        textAlign: 'center',
        fontSize: '9px',
        fontFamily: 'Inter',
        fontWeight: 'bold',
    },
    key: {
        padding: 0,
        margin: 0,
        fontSize: '9px',
        fontFamily: 'Inter',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    value: {
        textAlign: 'center',
        padding: 0,
        margin: 0,
        fontSize: '9px',
        fontFamily: 'Inter',
        fontWeight: 'light'
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

    },
    row: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '9px',
        paddingBottom: '3px',
    },

    celda: {
        textAlign: 'center',
        width: '100%',
        fontSize: '9px',
    },
    celda1: {
        textAlign: 'center',
        width: '100px',
        fontSize: '9px',
    },

    celda4: {
        textAlign: 'center',
        width: '150px',
        fontSize: '9px',
    },
    celda5: {
        textAlign: 'center',
        width: '100px',
        fontSize: '9px',
    },

    celdaWhite: {
        textAlign: 'center',
        width: '100%',
        fontSize: '9px',
    },
    italic: {
        padding: 0,
        margin: 0,
        fontSize: '9px',
        fontFamily: 'Inter',
        fontStyle: 'italic',
        fontWeight: 'light',

    },

})


const PDF = ({ i }) => {
    const [isCliente, setisCliente] = useState(false);
    const Br = () => {
        return <View style={{ height: '9px' }}></View>
    }
    console.log(i)
    useEffect(() => {
        setisCliente(true)
    }, []);
    return (
        <div className="min-w-full height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document >
                    <Page size={227} style={{ boxSizing: 'border-box', padding: '2.5mm', position: 'relative' }}>
                        <View>
                            <Image src="/logo.png" style={{ position: 'relative', right: '0', left: '0', marginHorizontal: 'auto', paddingBottom: '9px', height: '40px', width: '100px' }} />
                            {/* <Text style={styles.textBold}>COMPROBANTE IMPRESO</Text> */}
                            {/* <Text style={styles.text}>{i['sucursal']}</Text> */}
                            <Text style={styles.textBold}>ORDEN DE TRABAJO {i['sucursal']}</Text>
                            <Text style={styles.textBold}>{i.direccionSucursal}</Text>
                            <Text style={{ ...styles.textBold, fontSize: '16px' }}>{(i['code']).replaceAll('NUMERO_', '')}</Text>
                            {/* <Text style={styles.text}>{i['code']}</Text> */}
                            <Text style={styles.textItalic}>CONTACTOS 61278192 - 79588684</Text>
                            <Text style={{ ...styles.key, textAlign: 'center', }}>LA PAZ - BOLIVIA</Text>
                            <Br />
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Fecha de recepción: </Text><Text style={styles.value}>{i['fecha'].split(' ')[2]}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Hora de recepción: </Text><Text style={styles.value}>{i['fecha'].split(' ')[0]} {i['fecha'].split(' ')[1]}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Nombre del cliente: </Text><Text style={styles.value}>{i['nombre']}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Celular: </Text><Text style={styles.value}>{i['whatsapp']}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>CI: </Text><Text style={styles.value}>{i['CI']}</Text>
                            </Text>
                            <Br />
                            <View style={styles.row}>
                                <Text style={styles.celda1}>CANT</Text>
                                <Text style={styles.celda}>{`DETALLES Y\nOBSERVACIONES`}</Text>
                                {/* <Text style={styles.celda}>OBSERVACIONES</Text> */}
                                <Text style={styles.celda4}>{'PRECIO\nUNIDAD+\nADICIONAL'}</Text>
                                <Text style={styles.celda5}>{'SUB\nTOTAL'}</Text>
                            </View>

                            {Object.values(i.servicios).map((el, index) => <li key={index}>
                                <View style={styles.row}>
                                    <Text style={{ ...styles.celda1, ...styles.text }}>{el['cantidad']}</Text>
                                    <View style={{ ...styles.celda, ...styles.text }}>
                                        <Text style={{ ...styles.celda, ...styles.text }}>{`${el['nombre 1']}`}</Text>
                                        <Text style={{ ...styles.celda, ...styles.italic }}>OBS:{el['observacion']}</Text>
                                    </View>
                                    <Text style={{ ...styles.celda4, ...styles.text }}>{el['costo']} BS </Text>
                                    <Text style={{ ...styles.celda5, ...styles.text }}>{(el['costo'] * el['cantidad']) + (el['adicional'] ? el['adicional'] * el['cantidad'] : 0)} BS</Text>
                                </View>
                            </li>)}
                            <Br />
                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>TOTAL</Text>
                                <Text style={styles.celda}>{
                                    i.total
                                } BS
                                </Text>
                            </View>
                            {i.descuento && i.descuento !== undefined && <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>Descuento -</Text>
                                <Text style={styles.celda}>{
                                    i.descuento
                                } BS
                                </Text>
                            </View>}
                            {i.adicional && i.adicional !== undefined && i.velox === true && <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>Velox +</Text>
                                <Text style={styles.celda}>{
                                    i.adicional
                                } BS
                                </Text>
                            </View>}

                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>AC</Text>
                                <Text style={styles.celda}>{
                                    i['ac']
                                } BS
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={{ ...styles.celda, backgroundColor: 'yellow' }}>SALDO</Text>
                                <Text style={{ ...styles.celda, backgroundColor: 'yellow' }}>{
                                    i['saldo']
                                } BS
                                </Text>
                            </View>
                            <Br />

                            {/* {i['fechaDeEntrega'] !== 'Velox' && <Text style={{ ...styles.key, textAlign: 'center', }}>Fecha de entrega: {i['fechaDeEntrega']}</Text>} */}

                            {i['fecha para recojo'] && i['fecha para recojo'] !== undefined && <Text style={{ ...styles.key, textAlign: 'center', }}>Fecha de entrega: {i['fecha para recojo']}</Text>}
                            {i['hora para recojo'] && i['hora para recojo'] !== undefined && <Text style={{ ...styles.key, textAlign: 'center', }}>Hora de entrega:{i['hora para recojo']}</Text>}
                            {i['velox'] && <Text style={{ ...styles.key, textAlign: 'center', }}>INMEDIATA VELOX</Text>}



                            {/* {(Object.values(i.servicios).filter(i => i.adicional && i.adicional !== null && i.adicional !== undefined) === undefined || Object.values(i.servicios).filter(i => i.adicional && i.adicional !== null && i.adicional !== undefined).length !== Object.values(i.servicios).length) && <div className='md:col-span-2'>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Fecha y hora de recojo de prenda</label>
                                {getDayMonthYearHourPluss3()}
                            </div>}
                            {Object.values(i.servicios).find(i => i.adicional && i.adicional !== null) !== undefined && <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Fecha velox de prenda</label>
                                <Input type="date" name="fecha para recojo" id="email" onChange={onChangeHandlerDate} defValue={state['fecha para recojo'] && state['fecha para recojo'] !== undefined ? formatDayMonthYearInput(state['fecha para recojo']) : ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="" require />
                            </div>} */}


                            <Br />
                            <Br />
                            <Br />
                            <Text style={styles.textBold}>NOTA IMPORTANTE</Text>
                            <Text style={styles.text}>1. La presente orden de trabajo es obligatoria ya que acredita el derecho de propiedad del cliente para la entrega de su prenda, que serán entregados al portador sin ninguna responsabilidad para la empresa.</Text>
                            <Text style={styles.text}>2. No nos responsabilizamos por objetos dejados en sus prendas de vestir.</Text>
                            <Text style={styles.text}>3. No nos responsabilizamos por el deterioro de prendas que en el transcurso de la limpieza sufra daño por la mala calidad de las telas o la confección..</Text>
                            <Text style={styles.text}>4. Señor cliente tiene un plazo de 30 días posteriores a la fecha de entrega acordada, para el recojo de su prenda.</Text>
                            <Text style={styles.text}>5. En casó de no recoger su prenda de vestir en un plazo máximo de 60 días de la fecha de entrega, quedará a disposición de la empresa como compensación por los gastos de producción.</Text>
                            <Text style={{ ...styles.key, textAlign: 'center' }}>!GRACIAS POR SU PREFERENCÍA!</Text>
                            <Text style={{ ...styles.key, textAlign: 'center' }}>www.app.lavavelox.com</Text>
                        </View>
                    </Page>
                    <Page size={227} style={{ boxSizing: 'border-box', padding: '2.5mm', position: 'relative' }}>
                        <View>
                            <Image src="/logo.png" style={{ position: 'relative', right: '0', left: '0', marginHorizontal: 'auto', paddingBottom: '9px', height: '40px', width: '100px' }} />
                            {/* <Text style={styles.textBold}>COMPROBANTE IMPRESO</Text> */}
                            {/* <Text style={styles.text}>{i['sucursal']}</Text> */}
                            <Text style={styles.textBold}>ORDEN DE TRABAJO {i['sucursal']}</Text>
                            <Text style={styles.textBold}>{i.direccionSucursal}</Text>
                            <Text style={{ ...styles.textBold, fontSize: '16px' }}>{(i['code']).replaceAll('NUMERO_', '')}</Text>
                            {/* <Text style={styles.text}>{i['code']}</Text> */}
                            <Text style={styles.textItalic}>CONTACTOS 61278192 - 79588684</Text>
                            <Text style={{ ...styles.key, textAlign: 'center', }}>LA PAZ - BOLIVIA</Text>
                            <Br />
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Fecha de recepción: </Text><Text style={styles.value}>{i['fecha'].split(' ')[2]}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Hora de recepción: </Text><Text style={styles.value}>{i['fecha'].split(' ')[0]} {i['fecha'].split(' ')[1]}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Nombre del cliente: </Text><Text style={styles.value}>{i['nombre']}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>Celular: </Text><Text style={styles.value}>{i['whatsapp']}</Text>
                            </Text>
                            <Text style={styles.textRight}>
                                <Text style={styles.key}>CI: </Text><Text style={styles.value}>{i['CI']}</Text>
                            </Text>
                            <Br />
                            <View style={styles.row}>
                                <Text style={styles.celda1}>CANT</Text>
                                <Text style={styles.celda}>{`DETALLES Y\nOBSERVACIONES`}</Text>
                                {/* <Text style={styles.celda}>OBSERVACIONES</Text> */}
                                <Text style={styles.celda4}>{'PRECIO\nUNIDAD+\nADICIONAL'}</Text>
                                <Text style={styles.celda5}>{'SUB\nTOTAL'}</Text>
                            </View>

                            {Object.values(i.servicios).map((el, index) => <li key={index}>
                                <View style={styles.row}>
                                    <Text style={{ ...styles.celda1, ...styles.text }}>{el['cantidad']}</Text>
                                    <View style={{ ...styles.celda, ...styles.text }}>
                                        <Text style={{ ...styles.celda, ...styles.text }}>{`${el['nombre 1']}`}</Text>
                                        <Text style={{ ...styles.celda, ...styles.italic }}>OBS:{el['observacion']}</Text>
                                    </View>
                                    <Text style={{ ...styles.celda4, ...styles.text }}>{el['costo']} BS </Text>
                                    <Text style={{ ...styles.celda5, ...styles.text }}>{(el['costo'] * el['cantidad']) + (el['adicional'] ? el['adicional'] * el['cantidad'] : 0)} BS</Text>
                                </View>
                            </li>)}
                            <Br />
                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>TOTAL</Text>
                                <Text style={styles.celda}>{
                                    i.total
                                } BS
                                </Text>
                            </View>
                            {i.descuento && i.descuento !== undefined && <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>Descuento -</Text>
                                <Text style={styles.celda}>{
                                    i.descuento
                                } BS
                                </Text>
                            </View>}
                            {i.adicional && i.adicional !== undefined && i.velox === true && <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>Velox +</Text>
                                <Text style={styles.celda}>{
                                    i.adicional
                                } BS
                                </Text>
                            </View>}

                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celda}>AC</Text>
                                <Text style={styles.celda}>{
                                    i['ac']
                                } BS
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={styles.celdaWhite}></Text>
                                <Text style={{ ...styles.celda, backgroundColor: 'yellow' }}>SALDO</Text>
                                <Text style={{ ...styles.celda, backgroundColor: 'yellow' }}>{
                                    i['saldo']
                                } BS
                                </Text>
                            </View>
                            <Br />

                            {/* {i['fechaDeEntrega'] !== 'Velox' && <Text style={{ ...styles.key, textAlign: 'center', }}>Fecha de entrega: {i['fechaDeEntrega']}</Text>} */}

                            {i['fecha para recojo'] && i['fecha para recojo'] !== undefined && <Text style={{ ...styles.key, textAlign: 'center', }}>Fecha de entrega: {i['fecha para recojo']}</Text>}
                            {i['hora para recojo'] && i['hora para recojo'] !== undefined && <Text style={{ ...styles.key, textAlign: 'center', }}>Hora de entrega:{i['hora para recojo']}</Text>}
                            {i['velox'] && <Text style={{ ...styles.key, textAlign: 'center', }}>INMEDIATA VELOX</Text>}



                            {/* {(Object.values(i.servicios).filter(i => i.adicional && i.adicional !== null && i.adicional !== undefined) === undefined || Object.values(i.servicios).filter(i => i.adicional && i.adicional !== null && i.adicional !== undefined).length !== Object.values(i.servicios).length) && <div className='md:col-span-2'>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Fecha y hora de recojo de prenda</label>
                                {getDayMonthYearHourPluss3()}
                            </div>}
                            {Object.values(i.servicios).find(i => i.adicional && i.adicional !== null) !== undefined && <div>
                                <label htmlFor="email" className="block mb-2 text-[16px] text-left font-medium text-gray-800">Fecha velox de prenda</label>
                                <Input type="date" name="fecha para recojo" id="email" onChange={onChangeHandlerDate} defValue={state['fecha para recojo'] && state['fecha para recojo'] !== undefined ? formatDayMonthYearInput(state['fecha para recojo']) : ''} className="bg-gray-50 border border-gray-300 text-gray-900 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    " placeholder="" require />
                            </div>} */}


                            <Br />
                            <Br />
                            <Br />
                            <Br />
                            <Br />
                            <Br />
                            <Br />

                        </View>
                    </Page>
                </Document>
            }
                fileName={`Comprobante_${i.code}`}>
                {({ blob, url, loading, error }) =>
                    <Button type="button" theme='PrimaryPrint'>Imprimir Comprobante</Button>
                }
            </PDFDownloadLink>}
        </div>
    );
};

export default PDF

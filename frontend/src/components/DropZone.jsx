import React, {useState} from 'react'
import styled from 'styled-components'
import XLSX from 'xlsx'
import {useDispatch, useSelector} from 'react-redux'
import {UploadInput} from "./UploadInput";
import {setColumns, setData, setFileName} from "./redux-components/common/actions";
import {makeColumns} from "./redux-components/lib/utils";
import {Container} from "react-bootstrap";

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 400px;
  margin: 5% auto;
  background: ${({isDragging}) => isDragging ? 'pink' : 'whitesmoke'};
  border: 2px dashed black;
}
`
const DropZoneTitle = styled.div`
  font-size: 25px;
  text-align: center;
  width: 100%;
  padding: 5px;
`
const SuccessTitle = styled.h3`
  color: #5a5a5a;
`

export const DropZone = () => {
    const [isDragging, setIsDragging] = useState(false)
    const fileName = useSelector(state => state.data.fileName)
    const dispatch = useDispatch()

    const handleDragEnter = e => {
        e.preventDefault()
        e.stopPropagation()
        console.log('ENTER')
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true)
        }
    }

    const handleDragLeave = e => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = e => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
        const files = e.dataTransfer.files, f = files[0]
        const reader = new FileReader()

        reader.onload = () => {
            if (files.length) {
                handleFile(files[0])
            }
        }
        reader.readAsArrayBuffer(f)
    }

    const handleFile = async (file) => {
        const reader = new FileReader()
        const rABS = !!reader.readAsBinaryString
        reader.onload = async (e) => {
            const bstr = e.target.result
            const wb = XLSX.read(bstr, {type: rABS ? 'binary' : 'array'})
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            const data = XLSX.utils.sheet_to_json(ws, {header: 1})
            dispatch(setData(data))
            dispatch(setColumns(makeColumns(ws['!ref'])))
            dispatch(setFileName(file.name))
            const dataObject = []
            // if (data.length > 0) {
            //     data.map(el => {
            //         if (el.length > 0 && el.length < 85) {
            //             dataObject.push({...el})
            //         }
            //     })
            // }
            // if (dataObject.length > 0) {
            //     try {
            //         await request(`http://localhost:8080/table`, 'POST', dataObject)
            //     } catch (e) {
            //         console.log(e, 'e in TableComponent')
            //     }
            // }
        }
        if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
    }

    return (
        <Container>
            <UploadWrapper isDragging={isDragging} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
                           onDrop={handleDrop}>
                <DropZoneTitle>
                    {
                        fileName ? <SuccessTitle>{fileName} <br/>Успішно завантажено <br/> <strong
                            style={{textDecoration: "underline"}}>натисніть показати
                            таблицю</strong></SuccessTitle> : 'Перетягніть сюди файл'
                    }
                </DropZoneTitle>
                <UploadInput handleFile={handleFile}/>
            </UploadWrapper>
        </Container>
    )
}

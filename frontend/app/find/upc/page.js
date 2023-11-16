'use client';
import {Go_back} from '../../components'
import {Start_button} from "../../components";
import {Heading} from "../../components";
import {useState, useEffect} from "react";
import Image from "next/image";
import start from "@/public/images/start.svg";
import {renderOption} from '../../components'
import {optionCardSkeleton} from "../../components";

const baseUrl = "http://localhost:8000/api/v1/find/upc";
export default function UPC() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [firstRequestMade, setFirstRequestMade] = useState(false);
    const fetchData = async () => {
        setFirstRequestMade(true);
        try {
            setLoading(true);

            const response = await fetch(baseUrl + `?upc=${inputValue}`, {
                method: "POST", headers: {
                    Accept: "application/json",
                }
            });

            const data = await response.json();
            if (data === null) {
                setData(null);
            } else {
                setData(data);
            }


            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInput = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <div>
            <Go_back/>
            <Heading title="Нахождение по UPC" description="Найдите товар, который имеет уникальный номер в системе"/>

            <div className="page_content">
                <div className="block_group">
                    <p className="muted">Впишите уникальный идентификатор</p>
                    <input type="text" onChange={handleInput} placeholder="xxxxxxxxxxxxxx" style={{width: 170}}/>
                </div>
            </div>
            <button onClick={fetchData} className="start_button">
                <Image src={start} id="back_icon" alt="Иконка проигрывателя"></Image>
                <span>Поехали</span>
            </button>
            <div style={{marginTop: 16}}>
                {/*{(data === null) ? (*/}
                {/*    <p> Ничего не нашлось </p>*/}
                {/*) : (*/}
                {/*    */}
                {/*    renderOption(data.title, data.category, data.price, data.image, data.link)*/}
                {/*)}*/}
                {
                    loading ? (
                        optionCardSkeleton()
                    ) : (
                        firstRequestMade ? (
                                data === null ? (
                                        <p> Ничего не нашлось</p>
                                    ) :
                                    (
                                        renderOption(data.title, data.category, data.price, data.image, data.url)
                                    )
                            ) :
                            (
                                <></>
                            )

                    )
                }

            </div>
        </div>)
}
"use client";

import {Go_back} from '../components'
import {Heading} from "../components";
import Image from "next/image";
import start from "@/public/images/start.svg";
import {useEffect, useState} from "react";
import {loading} from '../components'

const baseUrl = 'http://localhost:8000/api/v1/crawler/start'
const getStateUrl = 'http://localhost:8000/api/v1/crawler/state'

export default function Gather() {
    const [crawlerState, setCrawlerState] = useState('');
    const [dataGathered, setDataGathered] = useState(false);

    const startGather = async () => {
        setDataGathered(true);
        const response = await fetch(baseUrl, {
            method: "POST", headers: {
                "Accept": "application/json", "Content-Type": "application/json",
            }
        })

        const data = await response.json();
        setCrawlerState(data.state);
        return data.state;
    }

    const getState = async () => {
        const response = await fetch(getStateUrl, {
            method: "GET", headers: {
                "Accept": "application/json", "Content-Type": "application/json",
            }
        })

        const data = await response.json();
        setCrawlerState(data.state);
        return data.state;
    }

    const handleStart = () => {
        getState();


        if (crawlerState === 'running' || crawlerState === 'Already running!') {

        } else {
            startGather();
        }

        console.log(crawlerState);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getState();
        }, 5000);

        return () => clearInterval(interval);
    }, [crawlerState]);

    return (<div>
        <Go_back/>
        <Heading title="Полный сбор данных" description="Выгрузить все товары с сайта в базу данных"/>
        <div className="page_content">
            <button className="start_button" onClick={handleStart}>
                <Image src={start} id="back_icon" alt="Иконка проигрывателя"></Image>
                <span>Поехали</span>
            </button>
            {/*{loading()}*/}
            {crawlerState === 'running' ? (loading()) : (crawlerState === 'Already running!' ? (<div>
                            loading()
                            <span>Сбор данных уже запущен</span>
                        </div>
                    ) :
                    dataGathered ? (
                        <div>
                            <span style={{color: "lime"}}>Сбор данных завершен!</span>
                        </div>
                    ) : (<></>)
            )}
        </div>
    </div>)
}
"use client";

import Image from 'next/image'
import styles from './page.module.css'
import './style.css'
import Link from "next/link";

import globe from 'public/images/globe.svg'
import star from 'public/images/star.svg'
import find from 'public/images/find.svg'
import money from 'public/images/money.svg'
import barcode from 'public/images/barcode.svg'
import trash from 'public/images/trash.svg'
import logo from './logo.svg'

import {Table} from './table'
import {useState} from "react";

function function_card(title, description, icon, link) {
    return (<Link href={link}>
        <div className="function__card">
            <div className="function_card__icon">
                <Image src={icon} alt={icon} className="function_card__icon_svg"></Image>
            </div>

            <div className="function_card__body">
                <h1 className="function_card__title">{title}</h1>
                <p className="function_card__description">{description}</p>
            </div>
        </div>
    </Link>)
}

const baseUrl = "http://localhost:8000/api/v1/drop"

export default function Home() {
    const [data, setData] = useState(false);
    const deleteAllData = async () => {
        const response = await fetch(baseUrl, {
            method: "POST", headers: {
                Accept: "application/json",
            }
        });
        let rData = await response.json();
        setData(rData.success)

    }

    return (<div>
            <div className="block">
                <Image src={logo} alt="Логотип" className="logo_main"></Image>
                <div className="heading">
                    <h1 className="title">Добро пожаловать в систему <span className="title_books">Books.</span></h1>
                    <p className="description">Выберите желаемую опцию для начала работы</p>
                </div>

                <div className="functions">
                    {function_card("Полный сбор данных", "Выгрузить все товары с сайта в базу данных", globe, '/gather')}
                    {function_card("Сортировка по рейтингу", "Получите книги, которые будут отсортированы по их рейтингу", star, '/sort/rating')}
                    {function_card("Сортировка по цене", "Получите книги, которые будут отсортированы по цене", money, '/sort/price')}
                    {function_card("Нахождение по UPC", "Найдите товар, который имеет уникальный номер в системе", barcode, '/find/upc')}
                    {function_card("Нахождение по названию", "Произведите сортировку книг по заданному названию", find, '/find/name')}
                    <Link href="#" onClick={deleteAllData}>
                        <div className="function__card drop_all_data">
                            <div className="function_card__icon" style={{background: "#F47174"}}>
                                <Image src={trash} alt="Мусор" className="function_card__icon_svg"></Image>
                            </div>

                            <div className="function_card__body">
                                <h1 className="function_card__title">Удалить все записи</h1>
                                <p className="function_card__description">Вы можете полностью сбросить все хранящиеся
                                    данные о книгах</p>
                            </div>
                        </div>
                        {data && data === true ? (<div style={{marginTop: 8}}>
                            <p><b>Данные были удалены <span style={{color: "greenyellow"}}>успешно!</span></b>
                            </p></div>) : null}

                    </Link>


                </div>
            </div>
            <div className="block">
                <div className="heading">
                    <h1 className="title">Собранные данные</h1>
                    <p className="description">Здесь вы можете увидеть таблицу с собранными ранее данными</p>
                </div>

                <Table/>
            </div>
        </div>


    )
}


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


import {Table} from './table'

function function_card(title, description, icon, link) {
    return (
        <Link href={link}>
            <div className="function__card">
                <div className="function_card__icon">
                    <Image src={icon} alt={icon} className="function_card__icon_svg"></Image>
                </div>

                <div className="function_card__body">
                    <h1 className="function_card__title">{title}</h1>
                    <p className="function_card__description">{description}</p>
                </div>
            </div>
        </Link>
    )
}

const baseUrl = "http://localhost:8000/api/v1/drop"

export default function Home() {

    const deleteAllData = async () => {
        const response = await fetch(baseUrl, {
            method: "POST", headers: {
                Accept: "application/json",
            }
        });
    }

    return (
        <div>
            <div className="block">
                <div className="heading">
                    <h1 className="title">Добро пожаловать в систему <span className="title_books">Books.</span></h1>
                    <p className="description">Выберите желаемую опцию для начала работы</p>
                </div>

                <div className="functions">
                    {function_card("Полный сбор данных",
                        "Выгрузить все товары с сайта в базу данных",
                        globe,
                        '/gather'
                    )}
                    {function_card("Сортировка по рейтингу",
                        "Получите книги, которые будут отсортированы по их рейтингу",
                        star,
                        '/sort/rating'
                    )}
                    {function_card("Сортировка по цене",
                        "Получите книги, которые будут отсортированы по цене",
                        money,
                        '/sort/price'
                    )}
                    {function_card("Нахождение по UPC",
                        "Найдите товар, который имеет уникальный номер в системе",
                        barcode,
                        '/find/upc'
                    )}
                    {function_card("Нахождение по названию",
                        "Произведите сортировку книг по заданному названию",
                        find,
                        '/find/name'
                    )}
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


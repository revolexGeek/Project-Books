'use client';

import {Go_back, optionCardSkeleton, renderOption} from '../../components'
import {Heading} from "../../components";
import Image from "next/image";
import start from "@/public/images/start.svg";
import {useState} from "react";

const baseUrl = "http://localhost:8000/api/v1/sort/price";
export default function Rating() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [firstRange, setFirstRange] = useState(0);
    const [secondRange, setSecondRange] = useState(45);
    const [order, setOrder] = useState("desc");

    const fetchData = async () => {
        try {
            setLoading(true);

            const response = await fetch(baseUrl, {
                method: "POST", headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    from_price: firstRange, to_price: secondRange, order: order
                })
            });

            const data = await response.json();
            console.log(data);
            setData(data);


            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFirstRange = (event) => {
        const value = event.target.value;
        console.log(value);
        if (value == null || value === "") {
            setFirstRange(0);
        }
        if (value < 0) {
            setFirstRange(0);
        } else {
            if (value > secondRange) {
                setFirstRange(secondRange);
            } else {
                setFirstRange(value);
            }
        }
    }

    const handleSecondRange = (event) => {
        const value = event.target.value;
        console.log(value)
        if (value == null || value === "") {
            setSecondRange(0);
        }
        if (value < 0) {
            setSecondRange(0);
        } else {
            if (value < firstRange) {
                setSecondRange(firstRange);
            } else {
                setSecondRange(value);
            }
        }
    }

    const handleOrder = (event) => {
        const value = event.target.value;
        if (value === "По убыванию") {
            setOrder("desc");
        } else if (value === "По возрастанию") {
            setOrder("asc");
        }
        console.log(order);
    }
    return (
        <div>
            <Go_back/>
            <Heading title="Сортировка по цене"
                     description="Получите книги, которые будут отсортированы по цене"/>

            <div className="page_content">
                <div className="block_group">
                    <p className="muted">Введите мин. и макс. стоимость (в фунтах стерлинга)</p>
                    <div className="num_range">
                        <input type="number" min="0" value={firstRange}
                               onChange={(event) => handleFirstRange(event)} placeholder="0"/>
                        <input min="0" type="number" value={secondRange}
                               onChange={(event) => handleSecondRange(event)}
                               placeholder="45"/>
                    </div>
                </div>


                <div className="block_group">
                    <p className="muted">Выберите режим сортировки</p>
                    <select onChange={handleOrder}>
                        <option selected>По убыванию</option>
                        <option>По возрастанию</option>
                    </select>
                </div>
            </div>

            <button onClick={fetchData} className="start_button">
                <Image src={start} id="back_icon" alt="Иконка проигрывателя"></Image>
                <span>Поехали</span>
            </button>

            <div className="options">
                {loading ? (
                    optionCardSkeleton()
                ) : (
                    data.map((item) => {
                        return renderOption(item.title, item.category, item.price, item.image, item.url, item.rating);
                    })
                )}
            </div>
        </div>)
}
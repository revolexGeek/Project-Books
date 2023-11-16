import {useEffect, useState} from "react";
import stack from "public/images/stack.svg";
import Image from 'next/image';
import Link from "next/link";

const BASE_URL = `http://localhost:8000/api/v1/table`;

export function Table() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            const limit = 10; // Example value for limit
            try {
                const response = await fetch(BASE_URL + `?limit=${limit}&offset=${offset}`, {
                    method: "GET", headers: {
                        "Content-Type": "application/json", Accept: "application/json",
                    },
                });
                const data = await response.json();
                setItems([...items, ...data]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [offset]);

    return (<div>
        {loading ? (<div className="card__loader">
            <div className="card__skeleton card__title__loader"></div>
            <div className="card__skeleton card__description__loader"></div>
        </div>) : (items.length === 0 ? (<div>
            <p>Данных не обнаружено!</p>
            <span className="description"><Link href="/gather">Перейти на вкладку «Полный сбор данных»</Link></span>
        </div>) : (< table className="table">
                <thead>
                <tr>
                    <th>Обложка< /th>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Категория</th>
                    <th>Оценка</th>
                    <th>Цена (£)</th>
                    <th>В наличии</th>
                    <th>UPC</th>
                    <th>Обновлено</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (<tr key={item.id}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <td>
                            <a href={item.url}>
                                <img className="magazine rounded"
                                     height={64}
                                     width={64}
                                     src={item.image}
                                     alt="Обложка"
                                />
                            </a>
                        </td>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.rating}</td>
                        <td>£ {item.price}</td>
                        <td>{item.in_stock}</td>
                        <td>{item.upc}</td>
                        <td>{item.updated_at}</td>
                    </tr>

                ))}
                </tbody>
                <button onClick={() => setOffset(offset + 10)} className="load_more_button">
                    <Image src={stack} alt="Загрузить еще"></Image>
                    <span>Загрузить еще</span>
                </button>
            </table>

        ))}

    </div>);
}
'use client';

import {Go_back} from '../../components';
import {Heading} from "../../components";
import {renderOption} from '../../components';
import {useEffect, useState} from "react";
import {optionCardSkeleton} from "../../components";


const baseUrl = 'http://localhost:8000/api/v1/find/name';

export default function Name() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);

            const response = await fetch(baseUrl + `?title=${inputValue}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                }
            });

            const data = await response.json();
            setData(data);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        let value = event.target.value;
        setInputValue(event.target.value);
    };

    useEffect(() => {
        if (inputValue !== '') {
            const timeOutId = setTimeout(() => fetchData(), 500);
            return () => clearTimeout(timeOutId);
        }
    }, [inputValue])

    return (
        <div>
            <Go_back/>
            <Heading title="Поиск по названию" description="Произведите сортировку книг по заданному названию"/>

            <div className="page_content">
                <div className="block_group">
                    <p className="muted">Начните писать название интересующей Вас книги</p>
                    <input onChange={(event) => (handleChange(event))} value={inputValue} onKeyPress={handleChange}
                           type="text" style={{width: 170}} placeholder="The Project"/>
                </div>
            </div>
            <div className="options">
                {loading ? (
                    optionCardSkeleton()
                ) : (
                    data.map((item) => {
                        return renderOption(item.title, item.category, item.price, item.image, item.url);
                    })
                )}
            </div>
        </div>
    );
}
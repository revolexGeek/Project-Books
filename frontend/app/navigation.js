import Link from "next/link";
import Image from "next/image";
import globe from "public/images/globe.svg";
import star from "public/images/star.svg";
import money from "public/images/money.svg";
import barcode from "public/images/barcode.svg";
import find from "public/images/find.svg";

export function Navigation() {
    return (
        <nav className="navbar">
            <div className="links">
                <Link href="/gather">
                    <div className="item">
                        <Image src={globe} alt="Глобус"/>
                        Полный сбор данных
                    </div>
                </Link>

                <Link href="/sort/rating">
                    <div className="item">
                        <Image src={star} alt="Звезда"/>
                        Сортировка по рейтингу
                    </div>
                </Link>

                <Link href="/sort/price">
                    <div className="item">
                        <Image src={money} alt="Деньги"/>
                        Сортировка по цене
                    </div>
                </Link>

                <Link href="/find/upc">
                    <div className="item">
                        <Image src={barcode} alt="Штрихкод"/>
                        Нахождение по UPC
                    </div>
                </Link>

                <Link href="/find/name">
                    <div className="item">
                        <Image src={find} alt="Лупа"/>
                        Поиск по названию
                    </div>
                </Link>
            </div>
        </nav>
    )
}
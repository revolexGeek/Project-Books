import Image from 'next/image'
import branch from 'public/images/branch.svg'
import student from 'public/images/student.svg'
import group from 'public/images/group.svg'
import yandex from 'public/images/yandex.svg'
import git from 'public/images/git.svg'
import university from 'public/images/university.svg'


function render_category_item(text, icon) {
    return (
        <div className="footer__category_item">
            <Image src={icon} alt={icon.toString()}></Image>
            <span className="footer__category_item_text">{text}</span>
        </div>
    )
}

export function Footer() {
    return (
        <div className="footer">
            <div className="footer__category">
                <div className="footer__category_items">
                    <h1 className="footer__category_item_title">Работу выполнил:</h1>
                    {render_category_item("Надымов Альберт", student)}
                    {render_category_item("@bertelfeed", yandex)}
                </div>
            </div>
            <div className="footer__category"><div className="footer__category_items">
                <h1 className="footer__category_item_title">Студент:</h1>
                {render_category_item("МАУ (МГТУ)", university)}
                {render_category_item("ИВТб21о-2", group)}
            </div></div>
            <div className="footer__category"><div className="footer__category_items">
                <h1 className="footer__category_item_title">VCS:</h1>
                {render_category_item("DevOps", git)}
                {render_category_item("master", branch)}
            </div></div>


        </div>
    )
}
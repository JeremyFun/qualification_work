import React, {useState} from 'react'
import {Button, Card, Col, Container, Image, Jumbotron, Row} from "react-bootstrap";
import imgReact from '../../image/react.png'
import imgMongodb from '../../image/mongodb.png'
import imgNode from '../../image/node.js.png'
import imgDocker from '../../image/docker.png'
import imgExpress from '../../image/express.jpeg'
import imgGitHub from '../../image/github.jpeg'
import imgHeroku from '../../image/heroku.png'

const HomePage = () => {
    const technologies = [
        {
            name: "React",
            imageURL: imgReact,
            desc: "React - JavaScript-бібліотека з відкритим вихідним кодом для розробки призначених для користувача інтерфейсів."
        },
        {
            name: "Node.js",
            imageURL: imgNode,
            desc: "Node або Node.js - програмна платформа, заснована на движку V8."
        },
        {
            name: "Express",
            imageURL: imgExpress,
            desc: "Express, фреймворк web-додатків для Node.js"
        },
        {
            name: "Docker",
            imageURL: imgDocker,
            desc: "Docker - програмне забезпечення для автоматизації розгортання з підтримкою контейнеризації."
        },
        {
            name: "MongoDB",
            imageURL: imgMongodb,
            desc: "MongoDB - документоорієнтована система управління базами даних."
        },
        {
            name: "GitHub",
            imageURL: imgGitHub,
            desc: "Git - розподілена система керування версіями."
        },
        {
            name: "Heroku",
            imageURL: imgHeroku,
            desc: "Heroku - хмарна PaaS-платформа, що підтримує ряд мов програмування. "
        },
    ]

    const [show, setShow] = useState(false)
    return (<Container>
            <Row>
                <Col className="mt-3">
                    <Jumbotron>
                        <h3>Сайт створений для автоматизації навчального процесу кафедр ВВНЗ</h3>
                        <h5 className="font-italic">
                            Для спроби тестування ми використали кафедру №21. Вся автоматизація буде здійснюватися за
                            допомогою наступних технологій які наведені в списку.
                        </h5>
                    </Jumbotron>
                </Col>
            </Row>
            <h3 className="text-dark text-center pb-2">Використані технології для реалізації:</h3>
            <Row>
                {
                    technologies.map((t, idx) => (
                        <Col key={idx} md={3} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src={t.imageURL} style={{height: "8rem"}}/>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Title className="text-center" style={{
                                        fontWeight: "bold",
                                        fontSize: "24px"
                                    }}>{t.name}</Card.Title>
                                    <Card.Text style={{height: "7rem"}}>
                                        {t.desc}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>Ліцензія</h1>
                        <h4>
                            Ліцензія MIT

                            Авторське право (c) 2020 Яцій Владислав <br/>
                            <h6 className="font-italic">
                                    Цим ми надаємо дозвіл безкоштовно будь-якій особі, яка отримує копію цього
                                    програмного забезпечення та пов'язаних з ним файлів документації ("Програмне забезпечення"), здійснювати
                                    торгівлю Програмним забезпеченням без обмежень, включаючи без обмеження права на
                                    використання, копіювання, модифікацію, об'єднання , публікувати, розповсюджувати,
                                    субліцензувати та / або продавати копії Програмного забезпечення та дозволяти
                                    особам, яким
                                    надається Програмне забезпечення, робити це за умови дотримання таких умов:</h6>
                            {!show && <Button variant="primary" onClick={() => setShow(!show)}>Більше</Button>}

                            {
                                show && <h6 className="font-italic">

                                Вищезазначене повідомлення про авторські права та це повідомлення про дозвіл повинні
                                    бути
                                    включені в усі копії або значні частини Програмного забезпечення.

                                    ПРОГРАМНЕ ЗАБЕЗПЕЧЕННЯ НАДАЄТЬСЯ «ТАКЕ, ЯКЕ», БЕЗ ГАРАНТІЙ ЯКОЇ ВИДНОЇ, ЯВНОЇ ТА
                                    ПІСЛУГОВОЇ,
                                    Включаючи, НЕ ОБМЕЖЮЮЧИСЯ ГАРАНТІЇ НА ПРОДУКЦІЮ, ПРИГОДНІСТЬ ДЛЯ ПЕВНОЇ ЦІЛІ ТА
                                    НЕПОКАЗАННЯ.
                                    НІ В якому разі автори або власники авторських прав не несуть відповідальності за
                                    будь-яку
                                    претензію, шкоду чи іншу відповідальність, незалежно від того, чи діють договори,
                                    делікт або
                                    інше, що виникають з, поза або в зв'язку з програмним забезпеченням або
                                    використанням чи
                                    іншими операціями. ПРОГРАМНЕ ЗАБЕЗПЕЧЕННЯ.
                                </h6>
                            }
                        </h4>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>

    )
}

export default HomePage

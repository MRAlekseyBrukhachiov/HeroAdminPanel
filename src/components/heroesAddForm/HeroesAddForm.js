import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

import { heroCreated } from "../../actions";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('');
    const [heroText, setHeroText] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroText,
            element: heroElement
        }

        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
            .then(data => console.log(data, 'Created'))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err))

        setHeroName('');
        setHeroText('');
        setHeroElement('');
    }

    const renderFilters = (filters) => {
        return filters.map(({name, label}) => {
            if (name === 'all') return null;
            return <option key={name} value={name}>{label}</option>
        });
    }

    const elements = renderFilters(filters);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroText}
                    onChange={(e) => setHeroText(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {elements}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;
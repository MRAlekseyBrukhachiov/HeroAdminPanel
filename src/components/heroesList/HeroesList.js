import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {
        data: heroes = [],
        isFetching, // последующие запросы
        isLoading, // обращение к серверу в первый раз
        isSuccess,
        isError,
        error
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return filteredHeroes;
        } else {
            return filteredHeroes.filter(hero => hero.element === activeFilter);
        }
    }, [heroes, activeFilter]);

    // оборачиваем в useCallback, потому что передаём эту функцию вниз по иеархии
    const onDelete = useCallback((id) => {
        deleteHero(id);
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem onDelete={() => onDelete(id)} key={id} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;
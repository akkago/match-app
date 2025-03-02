import React from 'react';
import './App.css';
import CrownImage from './CrownImage';
import AlertImage from './AlertImage';
import RefreshImage from './RefreshImage';

export interface ITeam {
    name: string;
    place: number;
    points: number;
}
export interface IMatch {
    awayTeam: ITeam;
    awayScore: number;
    homeTeam: ITeam;
    homeScore: number;
    status: string;
}

interface IMatchTableProps {
    matches: IMatch[];
    fetchData: any;
    error: string | null;
}
const MatchTable = (props: IMatchTableProps) => {
    const { matches, fetchData, error } = props;
    return (
        <div className='container'>
            <div className='header-container'>
                <div className='caption'>Match Tracker</div>
                <div className='header-loader-container'>
                    {error &&(<div className='info'>
                        <AlertImage />
                        <span>Ошибка: не удалось загрузить информацию</span>
                    </div>)}
                    <button className='button' onClick={fetchData}>
                        <span>Обновить</span>
                        <RefreshImage />
                    </button>
                </div>
            </div>
            <table className='match-table'>
                <tbody>
                    {matches?.map((match, index) => (
                        <tr key={index} className='row'>
                            <td>
                                <div className='team1'>
                                    <CrownImage />
                                    <span>{match.awayTeam.name}</span>
                                </div>
                            </td>
                            <td>
                                <div className='row-score'>
                                    {match.awayScore} - {match.homeScore}
                                </div>
                                <span className={match.status == 'Ongoing'? 'row-status': 'row-status-ended'}>
                                    {match.status == 'Ongoing'? 'Live': 'Finished'}
                                </span>
                            </td>
                            <td>
                                <div className='team2'>
                                    <span>{match.homeTeam.name}</span>
                                    <CrownImage />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatchTable;
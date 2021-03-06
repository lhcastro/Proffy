import React, { useState, FormEvent } from 'react';

import './styles.css'
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';




function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();
        
      const response =  await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data); 
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os profs disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select options={[
                        { value: 'Artes', label: 'Artes' },
                        { value: 'Biologia', label: 'Biologia' },
                        { value: 'Ciencias', label: 'Ciencias' },
                        { value: 'Educação fisica', label: 'Educação fisica' },
                        { value: 'Geografia', label: 'Geografia' },
                        { value: 'Historia', label: 'Historia' },
                        { value: 'Matematica', label: 'Matematica' },

                    ]}
                        onChange={e => { setSubject(e.target.value) }}
                        value={subject}
                        name="subject"
                        label="Materia" />

                    <Select options={[
                        { value: '0', label: 'Domingo' },
                        { value: '1', label: 'Segunda-feira' },
                        { value: '2', label: 'Terca-feira' },
                        { value: '3', label: 'Quarta-feira' },
                        { value: '4', label: 'Quinta-feira' },
                        { value: '5', label: 'Sexta-feira' },
                        { value: '6', label: 'Sabado' },

                    ]}
                        onChange={e => { setWeekDay(e.target.value) }}
                        value={week_day}
                        name="week_day"
                        label="Dia da Semana" />


                    <Input 
                    type="time" 
                    name="time" 
                    label="Hora" 
                    onChange={
                        e => { setTime(e.target.value) }
                        
                    }
                    value={time}
                    />
                    <button type="submit">
                        Buscar
                    </button>

                </form>
            </PageHeader>

            <main>
                { teachers.map( (teacher:Teacher) => {
                    return <TeacherItem teacher={teacher} key={teacher.id} />
                })}
                

            </main>

        </div>
    )
}


export default TeacherList
import React, {useState, FormEvent} from 'react';
import PageHeader from '../../components/PageHeader';
import {useHistory}   from 'react-router-dom';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState(''); 
    const [avatar, setAvatar] = useState(''); 
    const [whatsapp, setWpp] = useState(''); 
    const [bio, setBio] = useState(''); 

    const [subject, setSubject] = useState(''); 
    const [cost, setCost] = useState(''); 

    

    const [scheduleItemsVector, setScheduleItems] = useState([ 
        {week_day: 0, from: '', to: ''}
        
        ]);

    

    function addNewScheduleItem(){

        setScheduleItems([
            ...scheduleItemsVector,
            {week_day: 0, from: '', to: ''}
        ]);
        
    }

    function setScheduleItemValue(position: Number, field: string, value:string) {
        const updatedScheduleItem = scheduleItemsVector.map( (scheduleItem, index)=> {
            if(index === position) {
                return {...scheduleItem, [field]:value }; 
            }

            return scheduleItem;
        });

        setScheduleItems (updatedScheduleItem);
    }

    function handleCrateClass(e:FormEvent){
        e.preventDefault();
        

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItemsVector
        }).then(  () => {
            alert('CADASTRO REALIZADO COM SUCESSO!');
            history.push('/')
        } ).catch( () => {
            alert('Errp no cadastro'); 
        }); 
    }


    return (
        <div id="page-teacher-form" className="container">

            <PageHeader 
            title="Que incrível que você quer dar aulas."
            description ="O primeiro passo é preencher esse formulario de inscrição"
            />

            <main>

                <form onSubmit={handleCrateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome completo"  value={name} onChange={
                            (e) => {  setName(e.target.value) }
                        }/>
                        <Input name="avatar" label="Avatar" value={avatar} onChange= {
                            (e) => { setAvatar(e.target.value)}
                        } />
                        <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={
                            (e) => { setWpp(e.target.value)}
                        } />
                        <Textarea  name="bio" label="Biografia" value={bio} onChange={
                            (e) => {setBio(e.target.value)}
                        } /> 
                                
                    </fieldset>
                    
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select options={[
                            { value : 'Artes' , label : 'Artes'},
                            { value : 'Biologia' , label : 'Biologia'},
                            { value : 'Ciencias' , label : 'Ciencias'},
                            { value : 'Educação fisica' , label : 'Educação fisica'},
                            { value : 'Geografia' , label : 'Geografia'},
                            { value : 'Historia' , label : 'Historia'},
                            { value : 'Matematica' , label : 'Matematica'},

                        ]}
                        value={subject}
                        name="subject" 
                        label="Materia"
                        onChange={
                            (e) => {  setSubject(e.target.value) }
                        }
                        />
                        <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={
                            (e) => {  setCost(e.target.value) }
                        } />
                                    
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                            + Novo Horario
                            </button>
                        </legend>
                        
                        {scheduleItemsVector.map( (scheduleItem,index) => {
                            return (
                                <div key={scheduleItem.week_day}  className="schedule-item">
                                    <Select 
                                    value={scheduleItem.week_day}
                                    name="week_day" 
                                    label="Dia da Semana"
                                    onChange= { e => setScheduleItemValue(index , 'week_day', e.target.value)}
                                    options={[
                                    { value : '0' , label : 'Domingo'},
                                    { value : '1' , label : 'Segunda-feira'},
                                    { value : '2' , label : 'Terca-feira'},
                                    { value : '3' , label : 'Quarta-feira'},
                                    { value : '4' , label : 'Quinta-feira'},
                                    { value : '5' , label : 'Sexta-feira'},
                                    { value : '6' , label : 'Sabado'},
                                    ]}    
                                />                     
                        <Input value={scheduleItem.from} type="time" name="from" label="Das" onChange={
                             e => setScheduleItemValue(index , 'from', e.target.value)
                        } />
                        <Input value={scheduleItem.to} type="time" name="to" label="Até" onChange={
                             e => setScheduleItemValue(index , 'to', e.target.value)
                        } />
                        </div>
                            );
                        })}  

                    </fieldset>
                    
                    <footer>
                        <p>
                            <img src={warningIcon} alt="aviso alerta"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
        
                    </footer>   
                </form>
            </main>
        </div>
    )
}

export default TeacherForm
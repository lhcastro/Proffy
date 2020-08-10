import React, { useState, useEffect } from 'react';
import { View, Text , TextInput } from "react-native";
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem , { Teacher} from '../../components/TeacherItem';
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [isFilterVisible, setIsFilterIsVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then( response => {
            if ( response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map( (teacher:Teacher)=> {
                    return teacher.id
                })
                setFavorites(favoritedTeachersIds); 
            }
        });
    }

    useFocusEffect( () => {
        loadFavorites();
    })

   

    async function handleFiltersSubmit(){

        loadFavorites();
        const response =  await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        console.log(response.data);
        setIsFilterIsVisible(false);
        setTeachers(response.data); 
    }

    function handleToggleFiltersvisible(){

        setIsFilterIsVisible(!isFilterVisible);
    }

    return (
        <View style={styles.container}>

            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersvisible}>
                        <Feather name="filter" size={20} color="#FFF"/>
                    </BorderlessButton>
                )}>
                
                {isFilterVisible && (
                    <View style= {styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholderTextColor='#c1bccc'
                            style={styles.input}
                            placeholder="Qual é a matéria?"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                    <TextInput
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                        placeholderTextColor='#c1bccc'
                                        style={styles.input}
                                        placeholder="Qual o dia?"
                                    />      
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                    <TextInput
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                        placeholderTextColor='#c1bccc'
                                        style={styles.input}
                                        placeholder="Qual o horário?"
                                    />      
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonTextStyle} >Filtrar</Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal:16,
                    paddingBottom: 24
                }}
            >
                {teachers.map(( teacher: Teacher) =>  {
                    return <TeacherItem key={teacher.id}  teacher={teacher}  favorited={favorites.includes(teacher.id)}/>
                })}
                
            </ScrollView>
        </View>
    );    
}   



export default TeacherList;
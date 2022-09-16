import { useEffect, useState } from 'react'
import { Image, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { styles } from "./style";
import logoImg from "../../assets/logo-nlw-esports.png"

import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Background } from '../../components/Background';


export function Home(){
    const navigation = useNavigation()

    function pathOpenGame({id, title, bannrUrl}: GameCardProps){
        navigation.navigate('game', {id, title, bannrUrl})
    }

    const [games, setGames] = useState<GameCardProps[]>([])

    useEffect(() => {
        fetch('http://192.168.0.124:3333/games')
        .then(response => response.json())
        .then(data => setGames(data))
    }, [])

    return (
        <Background>
            <SafeAreaView style={styles.container}>
                <Image
                    source={logoImg}
                    style={styles.logo}
                />

                <Heading
                    title="Encontre seu duo!"
                    subtitle="Selecione o game que deseja jogar..."
                />

                <FlatList
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({item}) =>(
                        <GameCard
                            data={item}
                            onPress={() => pathOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle = {styles.contentlist}
                
                />

                
            </SafeAreaView>
        </Background>
    )
}
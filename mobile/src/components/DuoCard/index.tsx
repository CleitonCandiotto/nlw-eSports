import { TouchableOpacity, View, Text } from 'react-native'
import { GameController } from 'phosphor-react-native'

import { styles } from './style'
import { DuoInfo } from '../DuoInfo'
import { THEME } from '../../theme'

export interface DuoCardProps {
    id: string,
    hourEnd: string,
    hourStart: string,
    name: string,
    useVoiceChannel: boolean,
    weekDays: string[],
    yearsPlayind: number,
}

interface Props {
    data: DuoCardProps,
    onConect: () => void
}

export function DuoCard ({data, onConect}: Props) {
    return (
        <View style={styles.container}>
            <DuoInfo
                label='Nome'
                value= {data.name}
            />
             <DuoInfo
                label='Tempo de jogo'
                value= {`${data.yearsPlayind} anos`}
            />
             <DuoInfo
                label='Disponibilidade'
                value={`${data.weekDays.length} Dias ${data.hourStart} - ${data.hourEnd}`}
            />
             <DuoInfo
                label='Chamada de áudio?'
                value={data.useVoiceChannel? 'Sim' : 'Não'}
                colorValue={data.useVoiceChannel? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
            />

            <TouchableOpacity 
            style={styles.button}
            onPress={onConect}
            >
                <GameController
                color={THEME.COLORS.TEXT}
                size={20}
                />
                <Text style={styles.buttonTitle}>
                    Adicionar
                </Text>
            </TouchableOpacity>

        </View>
    )
}
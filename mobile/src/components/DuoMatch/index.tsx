import {Text, View, Modal, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import * as Clipboard from 'expo-clipboard';

import {styles} from './style'
import { THEME } from '../../theme'
import { Heading } from '../Heading'

import { useState } from 'react';


interface props extends ModalProps{
    discord:string,
    onClose: () => void
}

export function DuoMacth({discord, onClose, ...rest}: props) {

    const [isCopy, setIsCopy] = useState(false)

    async function handleCopyDiscordClipboard (){
        setIsCopy(true);

        await Clipboard.setStringAsync(discord);

        Alert.alert('Usuário Copiado', 'Usuário copiado para você encontar o Duo no discord');

        setIsCopy(false);
    }
    return (
        <Modal 
        {...rest} 
        transparent 
        statusBarTranslucent
        animationType='fade'
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity 
                    style={styles.closeIcon}
                    onPress={onClose}
                    >
                        <MaterialIcons
                        name='close'
                        size={20}
                        color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>

                    <CheckCircle
                    size={64}
                    color={THEME.COLORS.SUCCESS}
                    weight='bold'
                    />

                    <Heading
                    title='Let´s play!'
                    subtitle='Agora é só começar a jogar!'
                    style={{alignItems:'center', marginTop:24}}
                    />

                    <Text style={styles.label}>
                        Adicione no Discord.
                    </Text>

                    <TouchableOpacity 
                    style={styles.discordbutton}
                    onPress={handleCopyDiscordClipboard}
                    disabled={isCopy}
                    >
                        <Text style={styles.discord}>
                            {isCopy? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </Modal>
    )
}
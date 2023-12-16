import {useQuasar} from 'quasar';
import DIalogConfirm from 'components/commun/DIalogConfirm.vue';

const usePopin = () => {
    const q$ = useQuasar();
    const openPopinConfirmation = (title: string, message: string) => {
        return new Promise<boolean>(resolve => {
            q$.dialog({
                component: DIalogConfirm,
                componentProps: {
                    title: title,
                    message: message,
                    ok: 'REST.BUTTON_YES',
                    close: 'REST.BUTTON_NO'
                },
                persistent: true,
            })
            .onOk(() => resolve(true))
            .onCancel(() => resolve(false))
        });
    }
    return {
        openPopinConfirmation
    }
}

export default usePopin;

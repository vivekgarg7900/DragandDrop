import { faAddressCard, faCoffee, faGlobeEurope, faStar, faVoicemail } from '@fortawesome/free-solid-svg-icons';

const Data = [
    {
        text: "Occurence of Event ",
        type: "send_email",
        "icon": faStar,
        "border": '#1E90FF',
        handles: {
            left: 4,
            right: 5
        },
        handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"]
    },
    {
        text: "Enter/Exit/Is In Segment",
        type: "send_sms",
        "icon": faCoffee,
        handles: {
            left: 2,
            right: 5
        },
        handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"]
    },
    {
        text: "Change In User Attribute",
        type: "send_push",
        "icon": faVoicemail,
        handles: {
            left: 2,
            right: 2,
        },
        handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"]
    },

    {
        text: "Enter/Exit Geo-fence",
        type: "enter_exit",
        "icon": faGlobeEurope,
        "border": '#1E90FF',
        handles: {
            left: 4,
            right: 3
        },
        handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"]
    },
    {
        text: "Enter/Exit Geo-fence",
        type: "specific_users",
        "icon": faAddressCard,
        "border": '#1E90FF',
        handles: {
            left: 2,
            right: 4
        },
        handleRightData: ["well done", "bounced", "fucked", "heyy", "aarey"]
    }

]

export default Data;



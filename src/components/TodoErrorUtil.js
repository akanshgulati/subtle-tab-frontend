export default {
    manageReject(e) {
        if (e.status > 400 && e.status < 500) {
            // call reset state when issue comes due to api
            this.resetState()
        } else {
            // call error state when issue comes due to unknown reason
            this.errorState()
        }
        this.$ga.event('calendar', 'error', e.status + navigator.onLine)
    },
    errorState() {
        if (!navigator.onLine) {
            this.integrate.errorTitle = 'You seem offline!'
            this.integrate.errorDesc = 'Please try once you come online.'
            this.integrate.reIntegration = false
        } else {
            this.integrate.errorTitle = 'Some error occurred!'
            this.integrate.errorDesc = 'Please try in new tab or contact support with your authentication code.'
            this.integrate.reIntegration = false
        }
    },
    resetState() {
        this.integrate.errorTitle = 'Some error occurred!'
        this.integrate.errorDesc = 'Integrate again or contact support with your authentication code.'
        this.integrate.reIntegration = true
        Remove(STORAGE.G_CAL_AUTH)
    }
}
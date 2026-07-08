class DateUtils {

    static getCurrentDate() {

        return new Date().toISOString().split('T')[0];

    }

    static getCurrentDateTime() {

        return new Date().toISOString().slice(0, 16);

    }

    static getTomorrowDate() {

        const date = new Date();

        date.setDate(date.getDate() + 1);

        return date.toISOString().split('T')[0];

    }

    static getYesterdayDate() {

        const date = new Date();

        date.setDate(date.getDate() - 1);

        return date.toISOString().split('T')[0];

    }

    static addDays(days) {

        const date = new Date();

        date.setDate(date.getDate() + days);

        return date.toISOString().split('T')[0];

    }

}

module.exports = DateUtils;
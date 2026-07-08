class Logger {

    static info(message) {

        console.log(`[INFO] ${message}`);

    }

    static success(message) {

        console.log(`✅ ${message}`);

    }

    static warning(message) {

        console.log(`⚠️ ${message}`);

    }

    static error(message) {

        console.log(`❌ ${message}`);

    }

    static step(message) {

        console.log(`\n========== ${message} ==========`);

    }

}

module.exports = Logger;
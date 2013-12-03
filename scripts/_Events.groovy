import grails.util.Environment

eventStatusUpdate = { msg ->
    if (msg == 'Running Grails application') {
        String gruntCommand = null

        switch (Environment.current) {
            case Environment.DEVELOPMENT:
                gruntCommand = 'dev-run'
                break

            case Environment.TEST:
                gruntCommand = 'prod-assemble'
                break
        }

        if (gruntCommand) {
            log "Starting 'grunt ${gruntCommand}'"
            String existingPath = System.getenv('PATH')
            Process process = [gruntBin, gruntCommand].execute(["PATH=${existingPath}:${nodeHome}"], null)
            process.consumeProcessOutput(System.out, System.err)
        }
    }
}

String getGruntBin() {
    String existingPath = System.getenv('PATH')
    def p = ["${nodeHome}/npm", 'config', 'get', 'prefix'].execute(["PATH=${existingPath}:${nodeHome}"], null)
    p.consumeProcessErrorStream(System.err)
    p.waitFor()
    "${p.text.trim()}/bin/grunt"
}

String getNodeHome() {
    System.getProperty('nodeBinDir', System.getenv('NODE_HOME') ?: '/usr/local/bin')
}

@SuppressWarnings('Println')
void log(String text) {
    println text
}
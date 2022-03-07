#!/usr/bin/env groovy
def getCommitMessage() {
    script {
        return sh(script : "git show -s --format=%B ${env.GIT_COMMIT}", returnStdout: true).trim()
    }
}
def getCommitAuthor() {
    script {
        return sh(script : "git --no-pager show -s --format=%B ${env.GIT_COMMIT}", returnStdout: true).trim()
    }
}

pipeline {
    agent any 
    environment {
        last_commit_msg = getCommitMessage()
        last_commit_author = getCommitAuthor()
        trimmedHash = GIT_COMMIT.take(10)
    }
    stages {
        stage('RUN SCRIPT') {
            steps {
                sshagent(credentials:['develop']){
                    sh script: '''
                        #!/bin/sh
                        ssh ubuntu@IP_ADDRESS << 'EOF'

                            ec() { [[ "$1" == "-h" ]] && { shift && eval $* > /dev/null 2>&1; ec=$?; echo $ec; } || eval $*; ec=$?; }

                            checker_function () {
                              if [[ "$ec" != "0" ]]; then
                                  echo "Error when executing command. Return code is [$ec]"
                                  exit $ec;
                                  EOF
                              fi
                            }

                            ec cd /home/ubuntu/postcodes-api
                            checker_function
                        	echo "********** CD INTO DIRECTORY SUCCESS **********"
                        	ec git stash
                            checker_function
                            echo "********** GIT STASH SUCCESS **********"
                            ec git fetch --all
                            checker_function
                            echo "********** GIT FECTH SUCCESS **********"
                            ec git checkout develop
                            checker_function
                            echo "********** GIT CHECKOUT SUCCESS **********"
                        	ec git pull origin develop
                            checker_function
                        	echo "********** GIT PULL SUCCESS **********"
                        	ec yarn
                            checker_function
                            echo "********** DEPENDENCY INSATLLATION SUCCESS **********"
                            ec yarn type
                            checker_function
                            echo "********** TYPESCRIPT COMPILATION SUCCESS **********"
                            ec pm2 restart userauth
                            checker_function
                            echo "********** PM2 RESTART SUCCESS **********"
                           exit
                        EOF
                    '''
                }

            }
        }
    }
    post { 
        success { 
          slackSend(channel: "#jenkins-logs", color:"#008000", message: "postcodes-api build success! \n\n  `${trimmedHash}` - ${last_commit_msg}")
        }
        failure { 
          slackSend(channel: "#jenkins-logs", color:"#FF0000", message: "postcodes-api build failed! \n\n  `${trimmedHash}` - ${last_commit_msg}")
        }
    }
}
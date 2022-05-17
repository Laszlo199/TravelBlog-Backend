pipeline{
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    tools {
        nodejs "18.1.0"
    }
    stages{
        stage("Build backend"){
            steps{
                echo "Building backend"
                dir("backend-travel-blog") {
                  sh "npm update"
                  sh "npm run build"
               }
            }
            post {
                always {
                    echo "Building backend finished"
                }
                success {
                    echo "Building backend succeeded"
                }
                failure {
                    echo "Building backend failed"
                }
            }
        }
    }
}
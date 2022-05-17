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
                    sh "echo 'Building backend finished'"
                }
                success {
                    sh "echo 'Building backend succeeded'"
                }
                failure {
                    sh "echo 'Building backend failed'"
                }
            }
        }
    }
}
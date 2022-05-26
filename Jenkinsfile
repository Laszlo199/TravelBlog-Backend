pipeline{
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    tools {
        nodejs "18.1.0"
    }
    stages{
        stage("Startup") {
            steps {
                dir("backend-travel-blog") {
                  sh "rm -rf coverage"
               }
            }
        }
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
        stage("Test"){
            steps{
                echo "Testing backend"
                dir("backend-travel-blog") {
                  sh "npm test -- --coverage"
               }
            }
            post {
                always {
                    echo "Testing finished"
                }
                failure {
                    echo "Testing failed"
                }
                success {
                    echo "Testing succeeded, collecting artifact"
                    archiveArtifacts "coverage/clover.xml"
                }
            }
        }
    }
}
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
        stage("Clean container") {
                steps{
                    script{
                        try{
                            sh "docker-compose --env-file config/Test.env down"
                        }finally{ }
                    }

                }
              }

        stage("Deploy") {
            steps{
                sh "docker-compose --env-file config/Test.env up -d"
            }
            post {
                always {
                    sh "echo 'deploying frontend finished'"
                }
                success {
                    sh "echo 'deploying frontend succeeded'"
                }
                failure {
                    sh "echo 'deploying frontend failed'"
                }
            }
        }
        stage("Push to registry") {
            steps {
                sh "docker-compose --env-file config/Test.env push"
            }
            post {
                always {
                    sh "echo 'Pushing to registry finished'"
                }
                success {
                    sh "echo 'Pushing to registry succeeded'"
                }
                failure {
                    sh "echo 'Pushing to registry failed'"
                }
            }
        }
    }
}
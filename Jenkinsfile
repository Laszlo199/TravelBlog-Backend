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

                  sh "npm update"
                  sh "npm run build"
                sh "docker-compose --env-file config/Test.env build api"

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
                                  post{
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
                          post{
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
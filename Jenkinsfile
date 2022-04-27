pipeline{
    agent any
    trigger{
        pollSCM("* * * * *")
    }
    stages{
        stage("Build backend"){
           when {
                     changeset "backend-travel-blog/**"
                 }
                  steps{
                   echo "Building backend"
                      dir("backend-travel-blog") {
                      sh "npm update"
                      sh "ng run build build"
                  }
        }
    }
    }
}
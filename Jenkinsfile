pipeline{
    agent any
    triggers {
        pollSCM("* * * * *")
    }
    tools {
        nodeJs "18.1.0"
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
        }
    }
}
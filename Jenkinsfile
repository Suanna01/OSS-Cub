pipeline {    
    agent any
    environment {
        PROJECT_ID = 'oss-fall'
        CLUSTER_NAME = 'k8s'
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = 'github2'  //GithubApp을 통해 추가한 jenkins credential id
   BUILD_ID='0.2'
    }
    stages {
        stage("Build image") {
            steps {
                script {
                    myapp = docker.build("sungone/oss-cub:${env.BUILD_ID}")
                }
            }
        }
        stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
             myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }
   stage('Deploy to GKE') {
       when {
          branch 'develop'
           }
           steps{
          sh "sed -i 's/oss-cub:latest/oss-cub:${env.BUILD_ID}/g' deployment.yaml"
          step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, 
          location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID])
           }
       }
    }
}

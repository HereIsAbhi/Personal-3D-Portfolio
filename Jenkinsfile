pipeline {
    agent any

    environment {
        IMAGE_NAME = "portfolio-3d"
        CONTAINER_NAME = "portfolio-3d"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }
        stage('Run Container') {
            steps {
                // Stop and remove any existing container
                sh "docker rm -f ${CONTAINER_NAME} || true"
                // Run the new container
                sh "docker run -d --name ${CONTAINER_NAME} -p 80:80 ${IMAGE_NAME}:latest"
            }
        }
    }
} 


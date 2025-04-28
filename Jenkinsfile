pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKER_IMAGE = "hereisabhi/portfolio-3d"
        CONTAINER_NAME = "portfolio-3d"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    // Login to Docker Hub
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}:latest").push()
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Stop and remove any existing container
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    // Run the new container
                    docker.image("${DOCKER_IMAGE}:latest").run("--name ${CONTAINER_NAME} -p 80:80")
                }
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
} 


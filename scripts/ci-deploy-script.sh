#!/bin/sh
#--------------------------------------------------------------------
# BUILD DOCKER IMAGE
#--------------------------------------------------------------------
IMAGE="node-sample-api-${ENV}"
PROJECT_VERSION=$(awk -F \" '/"version"':' ".+"/ { print $4; exit; }' package.json)
RANDOM_UUID=$(uuidgen | tr '[:upper:]' '[:lower:]')  # Generates a random UUID
VERSION=v${PROJECT_VERSION}_$(date +%F)_${RANDOM_UUID}

# Docker image build
docker build -q -t ${IMAGE} .
# 2 tags for version control
docker tag ${IMAGE} $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/${IMAGE}:${VERSION}
docker tag ${IMAGE} $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/${IMAGE}:latest

#--------------------------------------------------------------------
# AWS Docker PUSH/ECR
#--------------------------------------------------------------------
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

echo "Pushing the Docker image..."
docker push --all-tags $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/${IMAGE}

#--------------------------------------------------------------------
# HELM UPGRADE
#--------------------------------------------------------------------
# Setup cluster context
aws eks --region ${AWS_REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}

# Deploy helm chart
helm upgrade ${IMAGE} helm -f helm/${ENV}.yaml --debug --set image.repository=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${IMAGE},image.tag=${VERSION},fullnameOverride=${IMAGE} --install --namespace ${IMAGE} --wait --timeout 60s
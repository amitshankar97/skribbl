FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /skribbl-server

EXPOSE 80

# Copy csproj and restore as distinct layers
COPY Skribbl/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

# install System.Drawing native dependencies
# RUN apt-get update \
#     && apt-get install -y --allow-unauthenticated \
#         libc6-dev \
#         libgdiplus \
#         libx11-dev \
#      && rm -rf /var/lib/apt/lists/*

WORKDIR /skribbl-server
COPY --from=build-env /skribbl-server/out .
ENTRYPOINT ["dotnet", "Skribbl.dll"]
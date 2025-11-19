FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base 
WORKDIR /app 
EXPOSE 5050 

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build 

WORKDIR /src 

COPY ./src/WebTask.Api/ ./WebTask.Api/
COPY ./src/WebTask.Contracts/ ./WebTask.Contracts/

RUN dotnet restore "./WebTask.Api/WebTask.Api.csproj"

RUN dotnet publish "./WebTask.Api/WebTask.Api.csproj" -c Release -o /app/out 

FROM base AS final 

WORKDIR /app 

COPY --from=build /app/out . 

COPY ./src/WebTask.Api/gateway.fgp .

ENTRYPOINT ["dotnet", "WebTask.Api.dll"]
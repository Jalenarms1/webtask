FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base 
WORKDIR /app 
EXPOSE 5052

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build 

WORKDIR /src 

COPY Directory.Packages.props .

COPY ./src/WebTask.AuthService/ ./WebTask.AuthService/
COPY ./src/WebTask.Contracts/ ./WebTask.Contracts/
COPY ./src/WebTask.Shared/ ./WebTask.Shared/
RUN dotnet restore "./WebTask.AuthService/WebTask.AuthService.csproj" 

RUN dotnet publish "./WebTask.AuthService/WebTask.AuthService.csproj" -c Release -o /app/out 


FROM base AS final 

WORKDIR /app 

COPY --from=build /app/out . 

ENTRYPOINT ["dotnet", "WebTask.AuthService.dll"]
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base 
WORKDIR /app 
EXPOSE 5051 

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build 

WORKDIR /src 

COPY Directory.Packages.props .

COPY ./src/WebTask.TaskService/ ./WebTask.TaskService/
COPY ./src/WebTask.Contracts/ ./WebTask.Contracts/
COPY ./src/WebTask.Shared/ ./WebTask.Shared/
RUN dotnet restore "./WebTask.TaskService/WebTask.TaskService.csproj" 

RUN dotnet publish "./WebTask.TaskService/WebTask.TaskService.csproj" -c Release -o /app/out 


FROM base AS final 

WORKDIR /app 

COPY --from=build /app/out . 

ENTRYPOINT ["dotnet", "WebTask.TaskService.dll"]
rootProject.name = "znake-arena"

includeTeam("znake-starter-springboot")
includeTeam("remotecontrol")
includeTeam("sidewinder")

fun includeTeam(teamName: String) {
    include(":$teamName")
    project(":$teamName").projectDir = File("teams/${teamName}")
}

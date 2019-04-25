CREATE PROCEDURE BuildingUser_GetAll
AS
BEGIN
	SELECT 
		[Id],
		[UsersId],
		[BuildingId],
		[SinceWhen],
		[AssignedTo]
	FROM [dbo].[BuildingUser]
END
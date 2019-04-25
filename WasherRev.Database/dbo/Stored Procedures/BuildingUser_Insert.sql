CREATE PROCEDURE BuildingUser_Insert(
    @UsersId INT,
    @BuildingId INT,
    @SinceWhen DATETIME,
    @AssignedTo DATETIME
)
AS
BEGIN
	INSERT INTO [dbo].[BuildingUser] VALUES (
		@UsersId,
		@BuildingId,
		@SinceWhen,
		@AssignedTo
	)

	SELECT SCOPE_IDENTITY()
END
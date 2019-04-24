CREATE PROCEDURE Users_Insert(
	@RoleNo INT,
	@Username varchar(256),
	@Password varchar(MAX),
	@Email varchar(256),
	@RoomId INT,
	@IsActive bit,
	@Salt varchar(MAX)
)
AS
BEGIN
	INSERT INTO [dbo].[Users] VALUES(
		@RoleNo,
		@Username,
		@Password,
		@Email,
		@RoomId,
		@IsActive,
		@Salt
	)

	SELECT SCOPE_IDENTITY()
END
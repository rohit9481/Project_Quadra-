@s1 = constant [48 x i8] c"Hi!\0a- Name: Aman kunkekar\0a- Srn: PES2UG23CS805\0a\00"

declare i32 @printf(i8*, ...)

define i32 @main() {
  %s1_ptr = getelementptr [48 x i8], [48 x i8]* @s1, i32 0, i32 0
  call i32 (i8*, ...) @printf(i8* %s1_ptr)
  ret i32 0
}
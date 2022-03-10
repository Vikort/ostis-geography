file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (HolyModule SHARED ${SOURCES})

target_include_directories(HolyModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(HolyModule sc-memory)

add_dependencies(HolyModule sc-memory)

sc_codegen(HolyModule ${CMAKE_CURRENT_LIST_DIR})

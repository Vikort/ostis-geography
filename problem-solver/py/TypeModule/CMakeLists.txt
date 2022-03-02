file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (TypeModule SHARED ${SOURCES})

target_include_directories(TypeModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(TypeModule sc-memory)

add_dependencies(TypeModule sc-memory)

sc_codegen(TypeModule ${CMAKE_CURRENT_LIST_DIR})

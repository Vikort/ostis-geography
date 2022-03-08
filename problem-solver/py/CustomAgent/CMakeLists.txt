file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (CustomModule SHARED ${SOURCES})

target_include_directories(CustomModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(CustomModule sc-memory)

add_dependencies(CustomModule sc-memory)

sc_codegen(CustomModule ${CMAKE_CURRENT_LIST_DIR})
